import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosStatic } from 'axios'

import { StateSchema } from 'app/providers/StoreProvider'

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

type ActionCreatorType<Returned, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<Returned, Arg, { rejectValue: RejectValue }>

export class TestAsyncThunk<Returned, Arg, RejectValue> {
  dispatch: Dispatch

  api: jest.MockedFunctionDeep<AxiosStatic>

  navigate: jest.MockedFn<any>

  getState: () => StateSchema

  actionCreator: ActionCreatorType<Returned, Arg, RejectValue>

  constructor(
    actionCreator: ActionCreatorType<Returned, Arg, RejectValue>,
    state?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn()
    this.getState = jest.fn(() => state as StateSchema)
    this.api = mockedAxios
    this.navigate = jest.fn()
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    })
    return result
  }
}
