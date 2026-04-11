export default function Home() {
  return (
    <>
      {/* Imagem de fundo */}
      <section className='relative h-[400px] overflow-hidden'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            /*imagem de fundo*/
            backgroundImage: `url('https://files.catbox.moe/xb76od.png')`,
          }}
        >
          <div className='from-dark-bg via-dark-bg/50 absolute inset-0 bg-gradient-to-r to-transparent'></div>
        </div>
      </section>
    </>
  );
}
