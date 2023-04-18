
import styles from './App.module.css';
import UserForm from '../components/login/login';
import NavHeader from '../components/navheader/navheader';
import ChatBot from '../components/chatbot/chatbot';

function App() {
  return (
    <div class={styles.App}>
  
      <NavHeader />
      {/* <UserForm /> */}
       {/* <h1>Welcome</h1> */}
       <ChatBot />
    </div>
  );
}

export default App;
