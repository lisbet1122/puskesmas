import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab2Page implements OnInit {

  nama: string = '';
  nohp: string = '';
  email: string = '';
  tanggal: string = '';
  status: string = '';
  poli: string = '';
  keterangan: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
  ) {

  }

  ngOnInit() {
  }

  async addRegister() {
    // Validasi input
    if (this.nama === '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    } else if (this.nohp === '') {
      const toast = await this.toastController.create({
        message: 'Nomor HP/WA harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    } else if (this.email === '') {
      const toast = await this.toastController.create({
        message: 'Email harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    } else if (this.tanggal === '') {
      const toast = await this.toastController.create({
        message: 'Tanggal harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    } else if (this.status === '') {
      const toast = await this.toastController.create({
        message: 'Status harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    } else if (this.poli === '') {
      const toast = await this.toastController.create({
        message: 'Poli harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    } else if (this.keterangan === '') {
      const toast = await this.toastController.create({
        message: 'Keterangan harus diisi',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
      return;
    }

    // Data dikirim ke backend
    const body = {
      nama: this.nama,
      nohp: this.nohp,
      email: this.email,
      tanggal: this.tanggal,
      status: this.status,
      poli: this.poli,
      keterangan: this.keterangan,
      aksi: 'add_register'
    };

    this.postPvdr.postData(body, 'action.php').subscribe(async data => {
      if (data.success) {
        // Tampilkan pesan sukses
        const toast = await this.toastController.create({
          message: '✅ Pendaftaran berhasil!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await toast.present();

        // Reset form input
        this.nama = '';
        this.nohp = '';
        this.email = '';
        this.tanggal = '';
        this.status = '';
        this.poli = '';
        this.keterangan = '';

        // Navigasi setelah delay agar toast tampil dulu
        setTimeout(() => {
          this.router.navigate(['/tab3']);
        }, 2100);
      } else {
        const toast = await this.toastController.create({
          message: '❌ Gagal menyimpan data: ' + data.msg,
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        toast.present();
      }
    }, async err => {
      const toast = await this.toastController.create({
        message: '❌ Terjadi kesalahan koneksi.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    });
  }

} 