import React from 'react';

const TentangKami = () => {

  return (
    <div>
      {/* bagian 1 */}
            <div class="flex flex-wrap mt-10 mb-20 mx-10">
                <div class="w-full self-center px-4 mt-20 lg:mb-20 lg:w-1/2 ">
                    <h1 class="text-base font-semibold text-primary md:text-xl lg:text-2xl">Assalamualaikum Wr,Wb 👋, Perkenalkan <span
                            class="block font-bold text-dark text-4xl mt-1 mb-5 lg:text-5xl">SMP ISLAM ASQOLAN SAMARINDA</span></h1>
                    <h2 class="font-medium text-slate-500 text-lg mb-5 lg:text-2xl">SMP Islam Asqolan merupakan sekolah menengah berbasis asrama yang dirancang untuk memberikan pendidikan yang seimbang antara pelajaran formal dan pendidikan agama melalui sistem pondok pesantren. Sekolah ini didirikan pada tanggal 20 Agustus 2020 dan beroperasi di bawah naungan Yayasan Pendidikan Islam Al Quds Samarinda. Dengan visi untuk menciptakan generasi muda yang unggul dalam bidang akademik dan kuat dalam nilai-nilai keislaman, SMP Islam Asqolan menawarkan lingkungan belajar yang kondusif dan terintegrasi. </h2>
                </div>

                <div class=" mt-5 w-full self-end lg:w-1/2">
                    <div class="relative lg:mt-10 lg:right-0">
                        <img src="./src/assets/img/siswa.png" alt="ini foto saya.jpg" class="max-w-full mx-auto "/>
                        <span class="absolute bottom-0 -z-10 left-1/2 -translate-x-1/2 md:scale-125 ">
                            <svg width="400" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#14b8a6"
                                    d="M29.3,-47.1C41.6,-43.7,57.7,-43.2,68.2,-35.8C78.6,-28.4,83.5,-14.2,81.9,-0.9C80.4,12.4,72.4,24.8,64.4,36.4C56.4,48,48.3,58.8,37.5,55.4C26.8,51.9,13.4,34.3,0.3,33.7C-12.7,33.1,-25.4,49.5,-39.8,55C-54.2,60.6,-70.2,55.2,-78.9,44.2C-87.5,33.2,-88.8,16.6,-76,7.4C-63.3,-1.9,-36.6,-3.8,-25.2,-10.1C-13.8,-16.4,-17.8,-27.1,-16.2,-36.6C-14.5,-46.2,-7.3,-54.7,0.6,-55.8C8.5,-56.9,17,-50.6,29.3,-47.1Z"
                                    transform="translate(100 100)" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

{/* bagian 2 */}
    <div className='bg-slate-100'>
      <div class="mx-10 flex flex-wrap lg:pb-20">
                <div class=" mt-5 mx-auto w-full self-end lg:w-1/2">
                    <div class="relative lg:mt-10 lg:right-0">
                        <img src="./src/assets/img/siswa.png" alt="ini foto saya.jpg" class="max-w-full mx-auto "/>
                        <span class="absolute bottom-0 -z-10 left-1/2 -translate-x-1/2 md:scale-125 ">
                            <svg width="400" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#14b8a6"
                                    d="M29.3,-47.1C41.6,-43.7,57.7,-43.2,68.2,-35.8C78.6,-28.4,83.5,-14.2,81.9,-0.9C80.4,12.4,72.4,24.8,64.4,36.4C56.4,48,48.3,58.8,37.5,55.4C26.8,51.9,13.4,34.3,0.3,33.7C-12.7,33.1,-25.4,49.5,-39.8,55C-54.2,60.6,-70.2,55.2,-78.9,44.2C-87.5,33.2,-88.8,16.6,-76,7.4C-63.3,-1.9,-36.6,-3.8,-25.2,-10.1C-13.8,-16.4,-17.8,-27.1,-16.2,-36.6C-14.5,-46.2,-7.3,-54.7,0.6,-55.8C8.5,-56.9,17,-50.6,29.3,-47.1Z"
                                    transform="translate(100 100)"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="w-full self-center px-4 lg:w-1/2 lg:mb-50">
                    <h1 class="text-2xl font-semibold text-primary mb-4 md:text-3xl lg:text-4xl">Yayasan Pendidikan Islam Al Quds Samarinda </h1>
                    <h2 class="font-medium text-slate-700 text-justify text-lg mb-5 lg:text-2xl">Yayasan Pendidikan Islam Al Quds Samarinda merupakan lembaga yang menaungi SMP Islam Asqolan. Yayasan ini didirikan dengan tujuan untuk memfasilitasi pendidikan berbasis Islam yang komprehensif dan modern. Ketua yayasan ini adalah Ustadz Ahsanur Ahmad, Lc, yang merupakan lulusan dari Universitas Al Azhar, Mesir, sebuah institusi terkemuka dalam pendidikan Islam. Ustadz Ahsanur Ahmad memiliki visi untuk mengembangkan sistem pendidikan yang tidak hanya berfokus pada aspek akademis tetapi juga pada pembinaan karakter dan moral siswa melalui pendidikan agama yang mendalam.</h2>
                </div>
            </div>
    </div>

      {/* bagian 3 */}
    <div className="flex flex-col md:flex-row my-5 mx-auto justify-around items-center pt-8">

      <div className="bg-white w-full md:w-1/2 p-10 rounded-xl text-justify shadow-2xl border-solid border-2 max-w-[50vw] md:mx-2 mb-1 md:mb-0">
        <h3 className="font-bold text-2xl mb-4">Fasilitas dan Kurikulum</h3>
          <ul>
            <li>SMP Islam Asqolan menawarkan berbagai fasilitas yang mendukung kegiatan belajar-mengajar baik dari aspek formal maupun agama. Fasilitas tersebut mencakup ruang kelas yang nyaman, asrama yang teratur, perpustakaan dengan koleksi buku yang lengkap, serta laboratorium komputer untuk mendukung pembelajaran teknologi informasi. Kurikulum yang diterapkan adalah kurikulum nasional yang diperkaya dengan pelajaran agama seperti tahfidz Al-Qur'an, fiqh, aqidah, serta pelajaran kitab kuning yang merupakan salah satu ciri khas dari pendidikan pondok pesantren.</li>
          </ul>
      </div>

      <div className="bg-white w-full md:w-1/2 p-10 rounded-xl text-justify shadow-2xl border-solid border-2 max-w-[50vw] md:mx-2 mb-1 md:mb-0">
        <h3 className="font-bold text-2xl mb-4">Pendekatan Pendidikan</h3>
        <ul>
          <li>Pendekatan pendidikan di SMP Islam Asqolan didesain untuk menggabungkan antara ilmu pengetahuan umum dan ilmu agama. Siswa tidak hanya diajarkan mata pelajaran seperti matematika, ilmu pengetahuan alam, bahasa Indonesia, dan bahasa Inggris, tetapi juga diajarkan mata pelajaran agama secara intensif. Pembelajaran kitab kuning menjadi salah satu fokus utama, di mana siswa diajarkan untuk memahami dan mengaplikasikan ajaran-ajaran Islam dalam kehidupan sehari-hari.</li>
        </ul>
      </div>
      <div className="bg-white w-full md:w-1/2 p-10 rounded-xl text-justify shadow-2xl border-solid border-2 max-w-[50vw] md:mx-2 mb-1 md:mb-0">
        <h3 className="font-bold text-2xl mb-4">Teknologi Informasi</h3>
        <ul>
          <li>Salah satu aspek yang menjadi perhatian di SMP Islam Asqolan adalah pembelajaran teknologi informasi. Dengan kemajuan teknologi yang pesat, sekolah ini berusaha untuk membekali siswa dengan keterampilan dalam bidang IT yang relevan dengan kebutuhan zaman. Penguasaan teknologi informasi dianggap penting agar siswa dapat bersaing di era digital dan memanfaatkan teknologi untuk hal-hal yang positif dan produktif.</li>
        </ul>
      </div>
    </div>

    {/* bagian 4 */}
    <div class="bg-gray-100 flex flex-wrap lg:mb-20 lg:pb-10 ">
      <div class="w-full self-center px-4 mt-10 lg:mb-20 lg:w-1/2">
        <h1 class="text-2xl font-semibold text-primary mb-4 md:text-3xl lg:text-4xl">Kepemimpinan dan Visi</h1>
        <h2 class="font-medium text-slate-700 text-lg mb-5 lg:text-2xl">Di bawah kepemimpinan Ustadz Ahsanur Ahmad, Lc, SMP Islam Asqolan terus berupaya untuk menjadi lembaga pendidikan yang unggul dan berprestasi. Ustadz Ahsanur Ahmad, yang memiliki latar belakang pendidikan dari Al Azhar Mesir, membawa wawasan global dan pendekatan pendidikan Islam yang mendalam. Beliau berkomitmen untuk memastikan bahwa setiap siswa yang lulus dari SMP Islam Asqolan tidak hanya memiliki pengetahuan yang luas, tetapi juga memiliki akhlak yang mulia dan siap menjadi pemimpin masa depan yang berintegritas.

Visi yang diusung adalah terciptanya generasi unggul di bidang Quran, keilmuan, dan karakter, di mana para siswa diharapkan tidak hanya menguasai ilmu pengetahuan dan teknologi, tetapi juga mendalami dan mengamalkan ajaran Al-Quran serta memiliki karakter yang kuat dan berakhlak mulia. </h2>
    </div>

    <div class=" mt-5 w-full self-end lg:w-1/2">
      <div class="relative lg:mt-10 lg:right-0">
        <img src="./src/assets/img/siswa.png" alt="ini foto saya.jpg" class="max-w-full mx-auto "/>
        <span class="absolute bottom-0 -z-10 left-1/2 -translate-x-1/2 md:scale-125 ">
          <svg width="400" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#14b8a6" d="M29.3,-47.1C41.6,-43.7,57.7,-43.2,68.2,-35.8C78.6,-28.4,83.5,-14.2,81.9,-0.9C80.4,12.4,72.4,24.8,64.4,36.4C56.4,48,48.3,58.8,37.5,55.4C26.8,51.9,13.4,34.3,0.3,33.7C-12.7,33.1,-25.4,49.5,-39.8,55C-54.2,60.6,-70.2,55.2,-78.9,44.2C-87.5,33.2,-88.8,16.6,-76,7.4C-63.3,-1.9,-36.6,-3.8,-25.2,-10.1C-13.8,-16.4,-17.8,-27.1,-16.2,-36.6C-14.5,-46.2,-7.3,-54.7,0.6,-55.8C8.5,-56.9,17,-50.6,29.3,-47.1Z" transform="translate(100 100)" />
          </svg>
        </span>
      </div>
    </div>
  </div>
</div>
  );
}

export default TentangKami;
