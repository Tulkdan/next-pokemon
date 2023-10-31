import Image from 'next/image'
import Link from 'next/link'
import Pill from './Pill'

export default function HeaderComponent() {
  return (
    <div className='flex w-full max-w-5xl justify-between my-3'>
      <Link href="/">
        <div className='flex items-center py-3 px-6 bg-red-600 rounded-full text-white'>
          <Image
            src="/images/white-pokeball.svg"
            alt="Pokeball logo"
            width={50}
            height={50}
            priority
          />
          <span className='ml-3'>Centro Pokémon</span>
        </div>
      </Link>

      <div className='flex items-center space-x-6'>
        <Link href="/about">
          <div>
            Quem Somos
          </div>
        </Link>
        <Link href="/schedule">
          <Pill>
            Agendar Consulta
          </Pill>
        </Link>
      </div>
    </div>
  )
}