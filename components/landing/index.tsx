/* eslint-disable */
"use client"
import React from "react"
import Explore from "@/components/landing/Explore"
import {
  PicCenterOutlined,
  PicLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import { useHandleSwitchView } from "./hooks"
import { switchIconStyles } from "./consts"
import Details from "@/components/Details"

function LandingPage() {
  const {
    handleSwitch,
    viewType,
    handleLoadMore,
    isFetching,
    isLoading,
    memesState,
    isError,
    data,
  } = useHandleSwitchView()

  return (
    <div>
      <div className="py-8">
        <div className="flex justify-between py-6">
          <h1 className="text-2xl font-bold">Explore</h1>
          <span onClick={handleSwitch}>
            {viewType === "Grid" ? (
              <PicLeftOutlined style={switchIconStyles} />
            ) : (
              <PicCenterOutlined style={switchIconStyles} />
            )}
          </span>
        </div>

        {isFetching && !isLoading && <p>Updating data.....</p>}

        {isError ? (
          <p>Error fetching data</p>
        ) : (
          <>
            {isLoading ? (
              <p>Loading..</p>
            ) : (
              <>
                {!memesState || memesState.length === 0 ? (
                  <div className="flex justify-center items-center">
                    <ExclamationCircleOutlined
                      style={{
                        fontSize: "24px",
                        color: "#CB245C",
                        marginRight: "8px",
                      }}
                    />
                    <p>No memes available</p>
                  </div>
                ) : // Render memes if there are any
                viewType === "Grid" ? (
                  <Explore memes={memesState} />
                ) : (
                  <Details memes={memesState} />
                )}
              </>
            )}
          </>
        )}

        {!!data?.data?.memes?.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-pink hover:bg-pink text-white font-medium text-xs py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isFetching && !isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LandingPage
