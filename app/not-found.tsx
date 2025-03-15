export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] text-center">
      <h1 className="text-6xl text-foreground">
        404
      </h1>
      <p className="mt-4 text-sm md:text-md text-muted-foreground">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <span className="mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text text-sm">
        Let&apos;s get you back on track.
      </span>
    </div>
  )
}
