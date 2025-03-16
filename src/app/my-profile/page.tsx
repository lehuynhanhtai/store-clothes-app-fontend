import { getProfile } from '@/lib/actions';

const MyProfile = async () => {
  const res = await getProfile();
  return (
    <div>
      {JSON.stringify(res)}
      <h1>My Profile</h1>
      <p>This is the My Profile page.</p>
    </div>
  );
};

export default MyProfile;
