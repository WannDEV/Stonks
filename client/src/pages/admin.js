const Admin = () => {
  return (
    <div>
      <h1>This is the admin page</h1>
      <p>This page can only be accessed by admins</p>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["admin"],
    },
  };
}

export default Admin;
