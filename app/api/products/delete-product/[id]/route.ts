import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/utils/dbConfig';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {

    const { id } = params;
    const client = await clientPromise;
    const db = client.db('ecommerce');

    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    
  } catch (error) {
    console.error('Delete Product Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}