import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Entity('artist')
class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ length: 50 })
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.id)
  albums: AlbumEntity[];
}

export { ArtistEntity };
