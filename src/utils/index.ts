import * as dayjs from 'dayjs';
import { isArray, isObject, isDate, cloneDeep } from 'lodash';

//  UTC 时间递归转转换 北京时间: YYYY-MM-DD HH:mm:ss 格式
export const transformDateTime = (data: any) => {
  let newData = cloneDeep(data);
  if (isDate(newData)) {
    // 如果是时间对象，则直接返回格式化结果
    return dayjs(newData).format('YYYY-MM-DD HH:mm:ss');
  } else if (isArray(newData)) {
    // 如果是数组，则遍历每个元素并执行递归结果返回
    newData = newData.map((item) => transformDateTime(item));
  } else if (isObject(newData) && !isDate(newData)) {
    // 如果是普通对象，则遍历key value 循环判断执行递归
    Object.keys(newData).forEach((key) => {
      newData[key] = transformDateTime(newData[key]);
    });
  } else {
    return newData;
  }

  return newData;
};
