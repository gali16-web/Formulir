import React, { useState } from 'react';
import './App.css'; 

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk animasi submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi proses login (misal loading 2 detik)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f4e8d8] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Menggunakan custom CSS style untuk membedakan rotasi cover di Mobile vs Desktop */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap');
        
        .book-cover {
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .book-cover.closed {
          transform: rotateY(0deg);
        }
        /* Mobile: Terbuka 180 derajat agar sampul benar-benar tersembunyi ke kiri (fokus ke form) */
        .book-cover.open {
          transform: rotateY(-180deg); 
        }
        /* Desktop: Terbuka 165 derajat untuk memberi efek 3D buku terbuka */
        @media (min-width: 768px) {
          .book-cover.open {
            transform: rotateY(-165deg);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />

      {/* Ornamen Meja (Disembunyikan sedikit di mobile agar lebih fokus) */}
      <div className="absolute top-10 left-10 w-48 md:w-64 h-48 md:h-64 bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-yellow-200/40 rounded-full mix-blend-multiply filter blur-3xl"></div>

      {/* Kontainer Utama */}
      {/* Di mobile: translate-x-0 (tetap di tengah). Di desktop: md:translate-x-[50%] (bergeser agar dua halaman terlihat) */}
      <div 
        className={`relative flex items-center justify-center w-full max-w-md z-10 transition-transform duration-[1500ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] ${isOpen ? 'md:translate-x-[50%] translate-x-0' : 'translate-x-0'}`}
        style={{ perspective: '2500px' }}
      >
        
        {/* ================= RIGHT PAGE (Halaman Login Utama) ================= */}
        <div className="relative w-full bg-[#fdfbf7] shadow-[15px_15px_40px_rgba(0,0,0,0.1),-5px_-5px_20px_rgba(255,255,255,0.4)] md:shadow-[20px_20px_50px_rgba(0,0,0,0.15),-10px_-10px_30px_rgba(255,255,255,0.4)] rounded-r-3xl rounded-l-md min-h-[500px] md:min-h-[550px] flex">
          
          {/* Garis Lurus (Lipatan Tengah Buku) */}
          <div className="w-3 md:w-4 h-full bg-gradient-to-r from-[#e3dfd6] to-[#fdfbf7] border-l border-[#c4c0b7] z-20 shadow-[inset_2px_0_4px_rgba(0,0,0,0.05)] flex-shrink-0 rounded-l-sm"></div>

          {/* Kertas Kanan (Form) */}
          <div 
            className="flex-1 p-6 md:p-12 relative overflow-hidden"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #d1d5db 31px, #d1d5db 32px)',
              backgroundAttachment: 'local',
              backgroundPosition: '0 2.5rem'
            }}
          >
            {/* Garis Margin Merah */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-red-300/60"></div>

            {/* Noda Kopi - Dihapus di mobile agar fokus murni ke formulir */}
            <div className="hidden md:block absolute -top-4 -right-4 w-32 h-32 rounded-full border-[4px] border-[#8b5a2b] opacity-15 transform -rotate-12 pointer-events-none mix-blend-multiply"></div>
            <div className="hidden md:block absolute -top-2 -right-8 w-28 h-28 rounded-full border-2 border-[#8b5a2b] opacity-10 transform rotate-45 pointer-events-none mix-blend-multiply"></div>

            {/* Stamp aesthetic (Approved / Date) */}
            <div className="absolute top-12 right-6 md:right-12 w-20 md:w-24 h-20 md:h-24 border-4 border-red-500/10 rounded-full flex flex-col items-center justify-center transform rotate-12 pointer-events-none mix-blend-multiply opacity-0 md:opacity-100 transition-opacity duration-1000 delay-[800ms]" style={{ opacity: isOpen ? 1 : 0 }}>
              <span className="text-red-500/20 font-bold tracking-widest text-xs md:text-sm uppercase font-sans">CONFIDENTIAL</span>
              <span className="text-red-500/20 text-[10px] md:text-xs mt-1 border-t border-red-500/20 pt-1">ENTRY LOG</span>
            </div>

            {/* Konten Form / Animasi */}
            <div className={`relative z-10 pl-4 md:pl-6 mt-2 md:mt-4 transition-all duration-700 delay-[600ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              
              {!isSubmitting && !isSuccess ? (
                <div style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Caveat', cursive" }}>Daily Log(in)</h2>
                  <p className="text-gray-500 text-xs md:text-sm mb-8 md:mb-10 italic">
                    {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, Memulai hari baru...
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 mt-4">
                    <div className="relative group">
                      <label className="block text-gray-700 font-bold mb-1" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>Siapa namamu?</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-0 border-b-2 border-transparent focus:border-orange-500 focus:ring-0 px-1 py-1 text-gray-800 outline-none transition-colors"
                        placeholder="email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem' }}
                      />
                    </div>
                    <div className="relative group">
                      <label className="block text-gray-700 font-bold mb-1" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.3rem' }}>Kata Sandi Rahasia:</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          className="w-full bg-transparent border-0 border-b-2 border-transparent focus:border-orange-500 focus:ring-0 px-1 py-1 pr-10 text-gray-800 outline-none transition-colors tracking-widest"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors focus:outline-none"
                          title={showPassword ? "Sembunyikan Sandi" : "Lihat Sandi"}
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                      <button type="button" className="text-gray-500 hover:text-[#8b2323] underline decoration-wavy decoration-[#8b2323]/40 hover:decoration-[#8b2323] text-xs md:text-sm transition-colors">Lupa kata sandi?</button>
                      <button type="submit" className="w-full sm:w-auto bg-[#5c4033] text-orange-50 px-6 py-3 rounded-sm shadow-[4px_4px_0px_#d4a373] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_#d4a373] hover:bg-[#4a3228] transition-all rotate-1 sm:rotate-2 font-semibold tracking-wide text-center group" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem' }}>
                        Buka Jurnal <span className="inline-block transition-transform group-hover:translate-x-1">➔</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : isSubmitting ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[350px] md:min-h-[400px] mt-10" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
                  <div className="w-12 h-12 border-4 border-[#8b5a2b]/30 border-t-[#8b5a2b] rounded-full animate-spin mb-6"></div>
                  <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.8rem' }} className="text-gray-700 animate-pulse text-center">Menyiapkan lembaran baru...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[350px] md:min-h-[400px] mt-10" style={{ animation: 'fadeIn 0.8s ease-out forwards' }}>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-green-200" style={{ animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: '2.5rem' }} className="text-gray-800">Akses Terbuka!</h2>
                  <p className="text-gray-500 mt-2 text-center text-sm font-sans italic">Selamat datang kembali,<br/><span className="font-bold text-[#8b2323]">{email || 'Penulis'}</span></p>
                </div>
              )}
            </div>
            
            {/* Sticky note "Jangan lupa senyum" telah dihapus sesuai permintaan */}
          </div>
        </div>

        {/* ================= THE COVER (Sampul Buku yang Terbuka 3D) ================= */}
        <div 
          className={`absolute top-0 left-0 w-full h-full z-30 cursor-pointer book-cover ${isOpen ? 'open' : 'closed'}`}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          {/* ----- FRONT COVER ----- */}
          <div 
            className="absolute inset-0 bg-[#4a2e1b] rounded-r-3xl rounded-l-md shadow-[10px_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-l-8 border-[#2d1b0f] group hover:bg-[#573620] transition-colors"
            style={{
              backfaceVisibility: 'hidden',
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)',
              backgroundSize: '3px 3px'
            }}
          >
            <div className="absolute inset-3 border-2 border-dashed border-[#8b5a2b]/60 rounded-2xl rounded-l-sm pointer-events-none"></div>
            
            <div className="bg-[#fdfbf7] px-8 md:px-10 py-5 md:py-6 rounded-sm shadow-inner text-center border border-[#d5d1c8] transform -rotate-2 group-hover:scale-105 group-hover:rotate-0 transition-all duration-500 mx-8">
              <p className="text-[9px] md:text-[10px] text-gray-400 font-sans tracking-[0.2em] mb-1">VOL. 01</p>
              <h1 className="text-4xl md:text-5xl text-gray-800 font-bold mb-2" style={{ fontFamily: "'Caveat', cursive" }}>My Daily<br/>Journal</h1>
              <div className="h-px w-full bg-gray-400 my-2 md:my-3"></div>
              <p className="text-[10px] md:text-xs text-orange-700/80 tracking-widest uppercase mt-2 font-sans font-semibold animate-pulse">Ketuk untuk Membuka</p>
            </div>

            {/* Pita pembatas buku (Bookmark) */}
            <div className="absolute -bottom-6 right-10 w-6 md:w-8 h-24 bg-[#8b2323] shadow-md flex items-end justify-center">
              <div className="w-full h-4 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute -bottom-3 w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-transparent border-r-[12px] md:border-r-[16px] border-r-transparent border-t-[12px] border-t-[#8b2323]"></div>
            </div>
          </div>

          {/* ----- BACK COVER ----- */}
          {/* disembunyikan (hidden) di layar HP (mobile) agar fokus 100% pada form. Di desktop (md:flex) tetap muncul estetis. */}
          <div 
            className="absolute inset-0 bg-[#fdfbf7] rounded-l-3xl rounded-r-md shadow-[inset_15px_0px_30px_rgba(0,0,0,0.06)] overflow-hidden border-r border-[#d5d1c8] hidden md:flex"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)', 
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
              backgroundAttachment: 'local',
              backgroundPosition: '0 2.5rem'
            }}
          >
            <div className="absolute right-8 top-0 bottom-0 w-[2px] bg-red-300/60"></div>

            <div className="w-full h-full p-10 flex flex-col items-center justify-center">
              <div className="bg-white p-3 pb-12 shadow-lg transform rotate-6 border border-gray-200 relative group transition-transform hover:rotate-2">
                {/* Isolasi Kertas (Tape) Atas */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-yellow-500/30 -rotate-6 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] border-b border-yellow-600/20 mix-blend-multiply z-10" style={{ clipPath: 'polygon(5% 0%, 98% 5%, 95% 100%, 0% 95%)' }}></div>
                
                {/* Isolasi Kertas (Tape) Bawah Kanan */}
                <div className="absolute -bottom-4 -right-4 w-16 h-5 bg-yellow-500/30 -rotate-45 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] border-b border-yellow-600/20 mix-blend-multiply z-10" style={{ clipPath: 'polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%)' }}></div>

                <div className="w-44 h-44 bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center relative">
                  <img 
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Coffee aesthetic" 
                    className="w-full h-full object-cover sepia-[.4] contrast-125 group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Subtle grain overlay */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
                </div>
                <p className="text-center mt-4 text-gray-800 font-bold" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.7rem' }}>
                  Semangat Pagi! ☕
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tombol Tutup Jurnal (Muncul setelah terbuka) */}
      {isOpen && (
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-600 hover:text-gray-900 bg-white/60 hover:bg-white/95 px-4 md:px-5 py-2 rounded-full shadow-sm backdrop-blur-sm transition-all text-xs md:text-sm font-bold border border-gray-300 z-50 transform hover:scale-105"
          style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}
        >
          Tutup ✖
        </button>
      )}

    </div>
  );
}
