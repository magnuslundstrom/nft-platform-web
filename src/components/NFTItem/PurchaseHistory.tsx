import { Typography } from '@mui/material';
import Table from '@/components/Generics/Table';
import Link from '@/components/Generics/Link';

interface Props {
  tableData: {
    buyer: string;
    price: string;
    seller: string;
    timeStamp: string;
  }[];
}

const PurchaseHistory: React.FC<Props> = ({ tableData }) => {
  const mappedTableData = tableData.map((data) =>
    Object.keys(data).map((_key) => {
      const key = _key as keyof typeof data;
      if (key === 'buyer' || key === 'seller') {
        return (
          <Link url={`/profile/${data[key]}`} key={key}>
            {data[key]}
          </Link>
        );
      }
      return <Typography key={data[key]}>{data[key]}</Typography>;
    }),
  );

  return (
    <Table
      headers={['Buyer', 'Seller', 'Price', 'Timestamp']}
      tableElements={mappedTableData}
    />
  );
};

export default PurchaseHistory;
