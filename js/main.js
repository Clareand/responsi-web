
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
    kode_obat = document.getElementById('kode_obat'),
    nama_obat = document.getElementById('nama_obat'),
    harga_obat = document.getElementById('harga_obat'),
    form = document.getElementById('form-obat');

    //menambahkan baris

    form.addEventListener('submit',tambahBaris);
    tabel.addEventListener('click',hapusBaris);

    function tambahBaris(e){
        if(tabel.rows.namedItem(kode_obat.value)){
            alert('Error: Obat Sudah Ada');
            e.preventDefault();
            return;
        }
        tambahDB({
            kode_obat:kode_obat.value,
            nama_obat:nama_obat.value,
            harga_obat:harga_obat.value
        });

        var baris = tabel.insertRow();
        baris.id=kode_obat.value;

        baris.insertCell().appendChild(document.createTextNode(kode_obat.value));
        baris.insertCell().appendChild(document.createTextNode(nama_obat.value));
        baris.insertCell().appendChild(document.createTextNode(harga_obat.value));

        //delete

        var btn = document.createElement('input');
        btn.type ='button';
        btn.value = 'Hapus';
        btn.id = kode_obat.value;
        btn.className='btn btn-danger btn-sm';
        baris.insertCell().appendChild(btn);
        e.preventDefault()
    }

    function tambahDB(obat){
        var objectStore = buatTransaksi().objectStore('obat');
        var request = objectStore.add(obat);
        request.onerror = errordbHandle;
        request.onsuccess = console.log('Obat['+obat.kode_obat+'] berhasil ditambahkan');

    }

    function buatTransaksi(){
        var transaction = db.transaction(['obat'],'readwrite');
        transaction.onerror = errordbHandle;
        transaction.complete = console.log ('Transaksi Selesai');
        return transaction;
    }

    function bacaBaris(){
        var objectStore = buatTransaksi().objectStore('obat');
        objectStore.openCursor().onsuccess = (e) =>{
            var result = e.target.result;
            if(result){
                console.log('Membaca['+result.value.kode_obat+']dari DB');
                var baris = tabel.insertRow();
        baris.id=kode_obat.value;

        baris.insertCell().appendChild(document.createTextNode(kode_obat.value));
        baris.insertCell().appendChild(document.createTextNode(nama_obat.value));
        baris.insertCell().appendChild(document.createTextNode(harga_obat.value));

        //delete

        var btn = document.createElement('input');
        btn.type ='button';
        btn.value = 'Hapus';
        btn.id = kode_obat.value;
        btn.className='btn btn-danger btn-sm';
        baris.insertCell().appendChild(btn);
        e.preventDefault()
            }
        }
    }

