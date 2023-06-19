import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Index('email_uindex', { unique: true })
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Index('first_name_index')
  @Column({ type: 'varchar', length: 20, nullable: false })
  first_name: string;

  @Index('last_name_index')
  @Column({ type: 'varchar', length: 20, nullable: false })
  last_name: string;

  @Index('date_created_index')
  @Column({ type: 'datetime', nullable: false })
  date_created: string;
}
