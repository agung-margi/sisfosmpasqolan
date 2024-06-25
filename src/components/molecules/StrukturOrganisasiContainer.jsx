import React,{useState} from 'react';
import DataGuru from "../data/DataGuru"
import DataJabatan from "../data/DataJabatan"


const StrukturOrganisasi = () => {
    const [dataGuruState, setDataGuru] = useState(DataGuru);
    const [dataJabatanState, setDataJabatan] = useState(DataJabatan);

    const getGuru = (jabatanId) => {    
        const guru = dataGuruState.find(g => g.id === jabatanId);
        return guru ? guru.namaLengkap: 'Jabatan tidak ditemukan';
    };

    return (
<div>
    <div className="container">
        <div className="countainer mx-20 items-center justify-center ">
            <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-dark my-20">Struktur Organisasi</h2>
        
        <div className="w-full flex flex-col items-center">
            {/* Container khusus untuk kepala sekolah */}
            <div className="w-full flex justify-center mb-8">
                <div className="w-1/2 md:w-1/3 p-4 border rounded shadow text-center">
                    <h3 className="text-xl font-bold">Kepala Sekolah</h3>
                    <p className="text-gray-600">Alfiansyah</p>
                </div>
            </div>

            {/* Container untuk grid jabatan lainnya */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {dataJabatanState.map((jabatan) => (
                    <div key={jabatan.id} className="p-4 border rounded shadow text-center">
                        <h3 className="text-xl font-bold">{jabatan.jabatan}</h3>
                        <p className="text-gray-600">{getGuru(jabatan.id)}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </div>
</div>

    );
};


export default StrukturOrganisasi;