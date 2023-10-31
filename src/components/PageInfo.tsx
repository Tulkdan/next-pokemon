import Breadcrumb from "./Breadcrumb"

export default function PageInfo({
  pagePath,
  pageTitle,
  pageSubtitle
}: {
  pagePath: string[]
  pageTitle: string
  pageSubtitle: string
}) {
  return (
  <div className='flex pt-7 pb-12 bg-red-600 justify-center text-white'>
    <div className="flex flex-col w-full max-w-5xl gap-y-2">
      <Breadcrumb pagePath={pagePath} />

      <div>
        <h2 className="font-extrabold text-3xl">
          { pageTitle }
        </h2>
      </div>
      <div className="text-sm">{ pageSubtitle }</div>
    </div>
  </div>
  )
}