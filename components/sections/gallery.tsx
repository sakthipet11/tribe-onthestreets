'use client'

import { useState } from 'react'

export default function Gallery() {
  const galleries = [
    {
      title: 'Community Moments',
      images: [
        '/musicians-jamming-together.jpg',
        '/guitar-player-performing.png',
        '/music-studio.png',
      ],
    },
    {
      title: 'Challenges & Progress',
      images: [
        '/practice-session-progress.jpg',
        '/recording-setup.jpg',
        '/musicians-collaborating.jpg',
      ],
    },
  ]

  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">See It In Action</h2>

        {galleries.map((gallery, idx) => (
          <div key={idx} className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6">{gallery.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gallery.images.map((img, imgIdx) => (
                <div key={imgIdx} className="relative overflow-hidden rounded-xl aspect-square bg-slate-800 hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer group">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${gallery.title} ${imgIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
