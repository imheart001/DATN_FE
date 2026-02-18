import React from "react";
import { QRCode, Space } from "antd";
import { useParams } from "react-router-dom";

const QrCode: React.FC = () => {
  const { id_code } = useParams();
  return (
    <>
      <Space>
        <QRCode type="canvas" value={{ id_code }} />
      </Space>
    </>
  );
};

export default QrCode;
