import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Urls {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  ogUrl: string

  @Column()
  slug: string

  @CreateDateColumn()
  createdDt: Date
}
