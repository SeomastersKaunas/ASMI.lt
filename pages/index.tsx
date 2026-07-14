import { GetServerSideProps } from 'next';

export default function Index() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.writeHead(302, { Location: '/lt' });
  res.end();
  return { props: {} };
};
