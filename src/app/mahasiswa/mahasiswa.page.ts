import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {

  constructor(public _apiService: ApiService, private modal:ModalController) { }
  
  ngOnInit() {
    this.getMahasiswa();
  }

  dataMahasiswa: any =[];
  modal_tambah = false;
  id: any;
  nama: any;
  jurusan: any;

  getMahasiswa() {
    this._apiService.tampil('tampilMahasiswa.php').subscribe({
      next: (res:any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err:any) => {
        console.log(err);
      },
    })
  }

  ambilMahasiswa(id:any) {
    this._apiService.lihat(id, '/lihatMahasiswa.php?id=').subscribe({
      next: (hasil:any)=> {
        console.log('sukses', hasil);
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
      },
      error: (error:any) => {
        console.log('gagal ambil data');
      }
    })
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  modal_edit = false;

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false
    this.reset_model();
  }

  tambahMahasiswa(){
    if (this.nama != '' && this.jurusan != '') {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      }
      this._apiService.tambah(data, '.tambahMahasiswa.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah mahasiswa');
          this.getMahasiswa();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah mahasiswa');
        }
      })
    } else {
      console.log('gagal tambah mahasiswa karena kosong');
    }
  }

  hapusMahasiswa(id: any) {
    this._apiService.hapus(id, '/hapusMahasiswa.php?id=').subscribe({
      next: (res:any) => {
        console.log('sukses', res);
        this.getMahasiswa();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      }
    })
  }

  open_modal_edit(isOpen:boolean, idget:any){
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan
    }
    this._apiService.edit(data, 'editMahasiswa.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getMahasiswa();
        console.log('berhasil edit Mahasiswa');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Mahasiswa');
      }
    })
  }

}