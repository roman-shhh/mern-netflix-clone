import useAuthStore from "../../store/authStore";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

function HomePage() {
  const { user } = useAuthStore();

  return (
    <div>{user ? <HomeScreen /> : <AuthScreen />}</div>
  )
}

export default HomePage;