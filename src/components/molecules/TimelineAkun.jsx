import React from 'react';
import { Timeline } from 'antd';

const TimelineAkun = () => {
  return (
  <Timeline
    items={[
      {
        children: 'Data pendaftaran sudah diterima',
      },
      {
        children: 'Pendaftaran diproses',
      },
      {
        children: 'Pendaftaran berhasil, Keterangan: ',
      },
    ]}
  />
);
}

export default TimelineAkun
