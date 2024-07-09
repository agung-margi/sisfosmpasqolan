import IndexCardImg from "../components/atoms/Card/IndexCardImg";
import TimelineAkun from "../components/molecules/TimelineAkun";
import BiodataContainer from "../components/molecules/BiodataContainer";

const DashboardFragment = () => {
  return (

    <div className="container mt-28">
      <div className="flex justify-center items-start space-x-10 my-10 h-screen">
        <div className="flex justify-center w-[800px] h-[500px] py-10 space-x-10 rounded-md shadow-xl border">
          <IndexCardImg />
          <BiodataContainer />
        </div>
        <div className="space-y-10">
          <h2 className="font-bold text-2xl ">Progress Pendaftaran</h2>
          <TimelineAkun />
        </div>
      </div>
    </div>

  );
};

export default DashboardFragment;
