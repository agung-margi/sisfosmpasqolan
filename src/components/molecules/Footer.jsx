import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="bg-hijau1 flex flex-col md:flex-row items-start md:items-center py-8">
        {/* Identitas Sekolah */}
        <div className="flex flex-col md:flex-row md:justify-start md:items-center mt-5 ml-36">
          <div>
            <img className="shrink-0 size-16 md:size-24 xl:size-32" src="/src/assets/img/logo/asqolanlogo.png" alt="Logo SMP ISLAM ASQOLAN" />
          </div>
          <div className="md:ml-4">
            <div>
              <p className="text-white">
                SMP ISLAM ASQOLAN <br />
                BOARDING SCHOOL
              </p>
              <p className="text-white">
                Alamat : Komplek Sekumpul Hill, Jl.P. Suryanata <br />
                Bukit Pinang, Samarinda
              </p>
              <p className="text-white">
                Telp : <span className="text-gray-400">&middot;</span> 021-5721-8981
              </p>
              <p className="text-white">
                Email : <span className="text-gray-400">&middot;</span> info@smpislamasqolan.sch.id
              </p>
            </div>
          </div>
        </div>
        {/* Peta */}
        <div className="md:ml-auto md:mr-32 mt-5">
          <iframe
            className="w-[15rem] h-[15rem]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.696769555475!2d117.11397447372273!3d-0.44724043528205276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df679399c8fc8b5%3A0x3f6852183a8af335!2sSMP%20Islam%20Asqolan!5e0!3m2!1sid!2sid!4v1711117876716!5m2!1sid!2sid"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
