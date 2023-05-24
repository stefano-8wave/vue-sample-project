import {
    HTTPError,
    HttpClientComposableRequestOptions,
    HttpClientUrlTemplate,
    RepositoryHttpComposableReadOptions,
} from '~/common/HttpClient'
import {
    RepositoryHttp,
    RepositoryHttpOptions,
    RepositoryHttpReadOptions,
} from '~/common/RepositoryHttp'
import { httpClient } from '~/plugins/httpClient'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParamMap = Record<string, any>

const HttpRequestStatus = {
    loading: 'loading',
    error: 'error',
    success: 'success',
    idle: 'idle',
} as const
type HttpRequestStatus =
    (typeof HttpRequestStatus)[keyof typeof HttpRequestStatus]

const defineHttpRequestStatus = () => {
    const status = ref<HttpRequestStatus>(HttpRequestStatus.idle)
    const isLoading = computed(() => status.value === HttpRequestStatus.loading)
    const isError = computed(() => status.value === HttpRequestStatus.error)
    const isSuccess = computed(() => status.value === HttpRequestStatus.success)
    return {
        status,
        isLoading,
        isError,
        isSuccess,
    }
}

export const useRepositoryHttp = <T = unknown, TResponse = unknown>(
    template: string | HttpClientUrlTemplate,
    options?: RepositoryHttpOptions<T, TResponse>,
) => {
    const repository = new RepositoryHttp<T, TResponse>(
        httpClient,
        template,
        options,
    )

    const create = (
        item: T | Ref<T>,
        params: ParamMap = {},
        options: HttpClientComposableRequestOptions = {},
    ) => {
        const { status, isLoading, isError, isSuccess } =
            defineHttpRequestStatus()
        const immediate = unref(options).immediate ?? true
        const error = ref<HTTPError>()
        const data = ref<T>()
        const metadata = ref<ParamMap>()

        const execute = (
            newItem: T = unref(item),
            newParams: ParamMap = unref(params),
            newOptions: RepositoryHttpReadOptions = unref(options),
        ) => {
            status.value = HttpRequestStatus.loading
            error.value = undefined
            const { abort, responsePromise } = repository.create(
                newItem,
                newParams,
                newOptions,
            )
            responsePromise
                .then((result) => {
                    data.value = result.data
                    metadata.value = result.metadata
                    if (result.aborted) {
                        status.value = HttpRequestStatus.idle
                        return
                    }
                    status.value = HttpRequestStatus.success
                })
                .catch((e) => {
                    error.value = e as HTTPError
                    status.value = HttpRequestStatus.error
                })
            return { abort, responsePromise }
        }
        return {
            execute,
            isLoading,
            isSuccess,
            isError,
            error: readonly(error),
            data,
            metadata,
            ...(immediate ? execute() : {}),
        }
    }

    const read = (
        params: ParamMap | Ref<ParamMap>,
        options: RepositoryHttpComposableReadOptions = {},
    ) => {
        const { status, isLoading, isError, isSuccess } =
            defineHttpRequestStatus()
        const immediate = unref(options).immediate ?? true
        const error = ref<HTTPError>()
        const data = ref<T[]>()
        const item = ref<T>()
        const metadata = ref<ParamMap>()

        const execute = (
            newParams: ParamMap = unref(params),
            newOptions: RepositoryHttpReadOptions = unref(options),
        ) => {
            status.value = HttpRequestStatus.loading
            error.value = undefined
            const { abort, responsePromise } = repository.read(
                newParams,
                newOptions,
            )
            responsePromise
                .then((result) => {
                    data.value = result.data
                    item.value = result.data?.[0]
                    metadata.value = result.metadata
                    if (result.aborted) {
                        status.value = HttpRequestStatus.idle
                        return
                    }
                    status.value = HttpRequestStatus.success
                })
                .catch((e) => {
                    error.value = e as HTTPError
                    status.value = HttpRequestStatus.error
                })
            return { abort, responsePromise }
        }
        return {
            execute,
            isLoading,
            isSuccess,
            isError,
            error: readonly(error),
            data,
            item,
            metadata,
            ...(immediate ? execute() : {}),
        }
    }

    const update = (
        item: T | Ref<T>,
        params: ParamMap = {},
        options: HttpClientComposableRequestOptions = {},
    ) => {
        const { status, isLoading, isError, isSuccess } =
            defineHttpRequestStatus()
        const immediate = unref(options).immediate ?? true
        const error = ref<HTTPError>()
        const data = ref<T>()
        const metadata = ref<ParamMap>()

        const execute = (
            newItem: T = unref(item),
            newParams: ParamMap = unref(params),
            newOptions: RepositoryHttpReadOptions = unref(options),
        ) => {
            status.value = HttpRequestStatus.loading
            error.value = undefined
            const { abort, responsePromise } = repository.update(
                newItem,
                newParams,
                newOptions,
            )
            responsePromise
                .then((result) => {
                    data.value = result.data
                    metadata.value = result.metadata
                    if (result.aborted) {
                        status.value = HttpRequestStatus.idle
                        return
                    }
                    status.value = HttpRequestStatus.success
                })
                .catch((e) => {
                    error.value = e as HTTPError
                    status.value = HttpRequestStatus.error
                })
            return { abort, responsePromise }
        }
        return {
            execute,
            isLoading,
            isSuccess,
            isError,
            error: readonly(error),
            data,
            metadata,
            ...(immediate ? execute() : {}),
        }
    }

    const remove = (
        params: ParamMap | Ref<ParamMap>,
        options: HttpClientComposableRequestOptions = {},
    ) => {
        const { status, isLoading, isError, isSuccess } =
            defineHttpRequestStatus()
        const immediate = unref(options).immediate ?? true
        const error = ref<HTTPError>()

        const execute = (
            newParams: ParamMap = unref(params),
            newOptions: RepositoryHttpReadOptions = unref(options),
        ) => {
            status.value = HttpRequestStatus.loading
            error.value = undefined
            const { abort, responsePromise } = repository.remove(
                newParams,
                newOptions,
            )
            responsePromise
                .then((result) => {
                    if (result.aborted) {
                        status.value = HttpRequestStatus.idle
                        return
                    }
                    status.value = HttpRequestStatus.success
                })
                .catch((e) => {
                    error.value = e as HTTPError
                    status.value = HttpRequestStatus.error
                })
            return { abort, responsePromise }
        }
        return {
            execute,
            isLoading,
            isSuccess,
            isError,
            error: readonly(error),
            ...(immediate ? execute() : {}),
        }
    }

    return {
        repository,
        read,
        create,
        update,
        remove,
    }
}
