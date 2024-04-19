"use client"
import { useEffect, useState } from "react"
import { useGetMemesQuery } from "@/lib/services/memeEndpoints"
import { useSelector } from "react-redux"
import { type RootState } from "@/lib/store/store"

export const useHandleSwitchView = () => {
  const [viewType, setViewType] = useState<"Grid" | "Row">("Grid")
  const [currentPage, setCurrentPage] = useState(0)
  const [setSearchQuery] = useState<any>("")
  const [memesState, setMemesState] = useState<any[]>([])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(0)
  }

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1)
  }
  const searchKey = useSelector((state: RootState) => state.search.searchKey)
  const response = useGetMemesQuery({
    page: currentPage,
    search: searchKey,
  })

  const memes = response?.data?.data?.memes

  useEffect(() => {
    if (memes) {
      if (currentPage === 0) {
        setMemesState(memes)
      } else {
        setMemesState(prevMemes => [...prevMemes, ...memes])
      }
    } else {
      setMemesState([])
    }
  }, [memes])

  const handleSwitch = () => {
    if (viewType === "Grid") {
      setViewType("Row")
    } else {
      setViewType("Grid")
    }
  }

  return {
    ...response,
    handleSwitch,
    viewType,
    handleLoadMore,
    memesState,
    setMemesState,
    handleSearch,
  }
}
