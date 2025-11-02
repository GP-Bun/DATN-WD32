import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

const AdminLogin = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.general || 'Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Đăng nhập Admin</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="email"
            placeholder="Email"
            className="admin-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-login-btn" disabled={isLoading}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <p>
          Chưa có tài khoản? <a href="/admin/register">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
