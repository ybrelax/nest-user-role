export interface PageModelItem {
  /**
   * @description 最后修改时间
   */
  lastModified?: number;

  /**
   * @description 页面 id
   */
  pageId?: number;

  /**
   * @description 权限
   */
  permissions?: Array<() => (boolean | Promise<boolean>) | boolean>;
}

// 站点数据模型
export interface WebSiteDataModel {
  [host: string]: {
    [path: string]: PageModelItem;
  };
}

export interface RouteDataModel {
  path: string;
  html: string;
}

// 网站路由数据模型
export interface RouterDataModel {
  host: string;
  routes: RouteDataModel[];
  defaultRoute?: string;
}
