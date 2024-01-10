import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmark(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarkById(userId, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async createBookmark(userId: number, bookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...bookmarkDto,
      },
    });

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    bookmarkDto: EditBookmarkDto,
  ) {
    //  get the bookmark by id
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
      },
    });

    // check if user owns the bookmark

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to ressource denied');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...bookmarkDto,
      },
    });
  }

  async deleteBookmarkById(userId: number, bookmarId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarId,
      },
    });

    // check if user owns the bookmark

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to ressource denied');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarId,
      },
    });
  }
}
