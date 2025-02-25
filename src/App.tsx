import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import GifMaker from './pages/GifMaker';
import LeetcodeGraph from './pages/LeetcodeGraph';
import MdConverter from './pages/MdConverter';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gif-maker" element={<GifMaker />} />
          <Route path="/leetcode-graph" element={<LeetcodeGraph />} />
          <Route path="/md-converter" element={<MdConverter />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
