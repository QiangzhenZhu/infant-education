import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'class/get',
    method: 'get',
    data
  })
}
