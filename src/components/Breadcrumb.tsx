export default function Breadcrumb({ pagePath }: { pagePath: string[] }) {
  const breadcrumb = pagePath
    .flatMap((path, i) => [
      (<li key={i} className="text-sm font-bold">
        { path }
      </li>),
      (<li key={`${i}-separator`} className="text-sm font-bold">
        &gt;
      </li>)
    ])

  breadcrumb.splice(-1, 1)

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
      { breadcrumb }
      </ol>
    </nav>
  )
}