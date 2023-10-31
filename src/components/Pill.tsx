
export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-3 px-6 bg-red-600 rounded-full text-white'>
      { children }
    </div>
  )
}