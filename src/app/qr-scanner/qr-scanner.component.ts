import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit, OnDestroy {

  html5QrCode!: Html5Qrcode;
  cameras: { id: string; label: string }[] = [];
  selectedCameraId: string | null = null;

  isScanning = false;
  scanResult: string | null = null;
  errorMessage: string | null = null;

  ngOnInit() {
    this.html5QrCode = new Html5Qrcode("reader");
    this.loadCameras();
  }

  ngOnDestroy() {
    this.stopScanner();
  }

  async loadCameras() {
    try {
      const devices = await Html5Qrcode.getCameras();
      this.cameras = devices;

      if (devices.length > 0) {
        this.selectedCameraId = devices[0].id;
      }
    } catch (err) {
      this.errorMessage = "Camera access denied or camera not available.";
    }
  }

  async startScanner() {
    if (!this.selectedCameraId) return;

    this.isScanning = true;
    this.scanResult = null;
    this.errorMessage = null;

    try {
      await this.html5QrCode.start(
        this.selectedCameraId,
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          this.scanResult = decodedText;
          this.stopScanner();
        },
        (errorMsg) => {
          // ignore scanning errors
        }
      );
    } catch (err) {
      this.errorMessage = "Unable to start scanner.";
      this.isScanning = false;
    }
  }

  async stopScanner() {
    if (this.isScanning) {
      try {
        await this.html5QrCode.stop();
      } catch {}
    }
    this.isScanning = false;
  }

  changeCamera(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCameraId = select.value;

    if (this.isScanning) {
      this.stopScanner();
      this.startScanner();
    }
  }
}
