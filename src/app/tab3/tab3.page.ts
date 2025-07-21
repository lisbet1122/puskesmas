import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule
  ]
})
export class Tab3Page implements OnInit {

  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  tabState: 'login' | 'admin' = 'login';

  daftarPendaftaran: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.tabState = this.isLoggedIn ? 'admin' : 'login';

    if (this.isLoggedIn) {
      this.getDataPendaftaran();
    }
  }

  // ✅ Fungsi Login
  login() {
    const data = {
      username: this.username,
      password: this.password
    };

    this.http.post('https://lisbetpuskes.aplikasi.blog/action.php', {
      aksi: 'login_admin',
      username: this.username,
      password: this.password
    }).subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedIn = true;
          this.tabState = 'admin';
          this.getDataPendaftaran(); // 👈 ambil data pasien setelah login
          alert('Login berhasil!');
        } else {
          alert('Login gagal: ' + res.message);
        }
      },
      (err) => {
        alert('Terjadi kesalahan saat login.');
        console.error(err);
      }
    );

  }

  // ✅ Fungsi Logout
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.tabState = 'login';
    this.username = '';
    this.password = '';
  }

  // ✅ Ambil Data dari Server
  getDataPendaftaran() {
    this.http.post('https://lisbetpuskes.aplikasi.blog/action.php', {
      aksi: 'getdata'
    }).subscribe(
      (res: any) => {
        if (res.success) {
          this.daftarPendaftaran = res.result;
        } else {
          alert('Gagal mengambil data: ' + res.message);
        }
      },
      (err) => {
        alert('Terjadi kesalahan saat mengambil data pendaftaran.');
        console.error(err);
      }
    );
  }


}
