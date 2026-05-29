import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <Result
    className="bg-white"
    status="404"
    title="404"
    subTitle="Sorry, Chúng mình không tìm thấy trang bạn đang tìm kiếm !!."
    extra={
      <Link to={"/"}>
        <Button type="primary" className="bg-blue-600">
          Back Home
        </Button>
      </Link>
    }
  />
);

export default NotFound;
