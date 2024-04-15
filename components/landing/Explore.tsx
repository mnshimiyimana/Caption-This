import Image from "next/image"

interface ExploreProps {
  memes: any[]
}

function Explore({ memes }: ExploreProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 animate-fade-up animate-delay-300 animate-once">
        {memes?.map((meme: any, index: number) => (
          <div key={index} className="relative">
            <Image
              src={meme?.imageSmall}
              alt={`Meme ${index}`}
              width={200}
              height={200}
              className="rounded-lg h-36 object-cover"
            />
            <p className="w-full text-xs absolute bottom-0 left-0 bg-gradient-to-r from-grey to- text-white px-2">
              {meme?.captionCount} captions
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
