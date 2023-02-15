import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AlbumEntity } from 'src/modules/album/entities/album.entity';

@Entity('artist')
class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];
}

export { ArtistEntity };
