"use client"
import { type MotionValue, motion, useScroll, useSpring, useTransform } from "motion/react"
import React from "react"
import { CommandSearch } from "./command-search"

export const HeroParallax = ({
  products
}: {
  products: {
    title: string
    link: string
    thumbnail: string
  }[]
}) => {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)

  return (
    <div className="overflow-hidden antialiased relative flex flex-col self-auto w-full">
      <Header />
      <div className="transform rotate-z-[20deg] rotate-x-[15deg] scale-90 absolute top-0 w-full opacity-20">
        <div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </div>
        <div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </div>
        <div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Crowd-Ranked AI Tools <br /> Globally Compared.
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200 opacity-50">
        Discover the most impactful AI tools across categories — ranked by the global community, tracked by region, and driven by open participation.
      </p>
      <div className={"relative z-50 w-fit"}>
        <CommandSearch />
      </div>
    </div>
  )
}
export const ProductCard = ({
  product
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
}) => {
  return (
    <motion.div
      whileHover={{
        y: -20
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img src={product.thumbnail} height="600" width="600" className="object-cover object-left-top absolute h-full w-full inset-0" alt={product.title} />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">{product.title}</h2>
    </motion.div>
  )
}
