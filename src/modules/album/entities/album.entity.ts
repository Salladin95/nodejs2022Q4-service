import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

@Entity('album')
class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  @ApiProperty({ example: 1888 })
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums)
  artist: ArtistEntity;
}

export { AlbumEntity };
