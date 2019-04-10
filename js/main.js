
  /*
* IndexedDB
* */
createDatabase();
function createDatabase() {
    if (!('indexedDB' in window)){
        console.log('Web Browser tidak mendukung Indexed DB');
        return;
    }
    var request = window.indexedDB.open('responsi-uts',1);
    request.onerror = errordbHandle;
    request.onupgradeneeded = (e)=>{
        var db = e.target.result;
        db.onerror = errordbHandle;
        var objectStore = db.createObjectStore('obat',
            {keyPath: 'kode_obat'});
        console.log('Object store Obat Berhasil dibuat');
    }
    request.onsuccess = (e) => {
        db = e.target.result;
        db.error = errordbHandle;
        console.log('Berhasil melakukan koneksi ke database lokal');
        // lakukan sesuatu ...
    }
}

function errordbHandle(e) {
    console.log('Error DB : '+e.target.errorCode);
}

var tabel = document.getElementById('tabel-obat'),
    kode_obat = document.getElementById('')