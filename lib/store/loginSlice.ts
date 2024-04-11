import { useReducer } from "react"

interface StateType {
  data: any
  loading: boolean
  error: any
}

interface ActionType {
  type: string
  payload?: any
}

const initialState: StateType = {
  data: null,
  loading: false,
  error: null,
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true, error: null }
    case "SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    case "ERROR":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const useLazyLoginQuery = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (token: string) => {
    dispatch({ type: "REQUEST" })

    try {
      const response = await fetch(`/api/auth/google?tokenId=${token}`)
      const data = await response.json()

      dispatch({ type: "SUCCESS", payload: data })
    } catch (error) {
      dispatch({ type: "ERROR", payload: error })
    }
  }

  return [state, login]
}

export default useLazyLoginQuery
