import Mock from 'mockjs';
const random = Mock.Random;

export const overView = Mock.mock({
  'code': 200,
  'data': {
    'file': random.float(60, 100, 3, 2) + 'M',
    'article|0-50': 0,
    'gallery|0-50': 0,
    'diary|0-50': 0,
    'project|0-50': 0,
    'resource|0-50': 0,
  },
});

export const visit = Mock.mock({
  'data|30': [
    {
      'date': "@datetime('MM-dd')",
      'count|10-30': 10,
    },
  ],
});

//饼状图
export const check = Mock.mock({
  'data': {
    'device': [
      {
        'key': 'mobile',
        'name': '移动端',
        'value|30-120': 50,
      },
      {
        'key': 'pc',
        'name': '客户端',
        'value|30-120': 50,
      },
    ],
    'website': [
      {
        'key': 'home',
        'name': '首页',
        'value|30-120': 50,
      },
      {
        'key': 'project',
        'name': '道具',
        'value|30-120': 50,
      },
      {
        'key': 'diary',
        'name': '日记',
        'value|30-120': 50,
      },
      {
        'key': 'gallery',
        'name': '摄影',
        'value|30-120': 50,
      },
    ],
  },
});

//评论
export const comments = Mock.mock({
  'data': {
    'count': 24,
    'list|24': [
      {
        'id|+1': 0,
        'article': {
          'id|+1': 2,
          'name': '@ctitle(3,12)',
        },
        'user': {
          'id|+1': 3,
          'name': '@ctitle(3,12)',
        },
        'comment': '@cparagraph(1,4)',
        'moment': '@datetime()',
        'complaint|0-12': 0,
      },
    ],
  },
});

//文章状态
export const state = Mock.mock({
  'data': [
    {
      'id': 0,
      'name': '已发布',
      'value|0-30': 4,
    },
    {
      'id': 1,
      'name': '未发布',
      'value|0-30': 4,
    },
  ],
});

//分组
export const subset = Mock.mock({
  'data': {
    'count': 24,
    'list|4': [
      {
        'id|+1': 0,
        'name': '@ctitle(2,6)',
        'value|0-30': 4,
        'moment': '@date("yyyy-MM-dd")',
      },
    ],
  },
});

// 图片数据
export const files = Mock.mock({
  'count': 64,
  'list|64': [
    {
      'id|+1': 0,
      'url|1': 'photo',
      'fileName': '@title(2,6)',
      'format': 'jpeg',
      'subsetid|0-4': 3,
    },
  ],
});

//标签
export const tag = Mock.mock({
  'data': {
    'count': 24,
    'list|4': [
      {
        'id|+1': 0,
        'name': '@ctitle(2,6)',
        'moment': '@date("yyyy-MM-dd")',
      },
    ],
  },
});
