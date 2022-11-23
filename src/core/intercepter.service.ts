import { Injectable } from '@nestjs/common';
import { getMatchedSync } from './intercepter';
import * as FilesMock from './files_mock.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IntercepterService {
  constructor(private readonly configService: ConfigService) {}

  async readHtml(urlObj: URL) {
    const { data: matchedData, path: matchedPath } = getMatchedSync(urlObj, this.websites);
    // const html = await this.configService.get(matchedPath);

    if (!matchedData) return null;

    const html = FilesMock[matchedData.pageId];
    // writeFileSync(urlObj.hostname, matchedPath, html);
    return html;
  }
}
