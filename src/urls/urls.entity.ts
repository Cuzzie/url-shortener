import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class Urls {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  ogUrl: string

  @Column()
  newUrl: string
}
