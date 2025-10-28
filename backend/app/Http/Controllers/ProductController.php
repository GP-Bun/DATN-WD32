<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::query()
            ->select(['id','name','price','status'])
            ->get()
            ->map(function($p){
                // map status based on stock/variants later; default active
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'price' => (float) $p->price,
                    'status' => $p->status ?? 'active',
                ];
            });

        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'price' => ['required','numeric','min:0'],
            'status' => ['nullable', Rule::in(['active','inactive'])],
        ]);

        $product = Product::create([
            'category_id' => 1, // TODO: adjust when category is provided
            'name' => $data['name'],
            'price' => $data['price'],
            'description' => $request->input('description'),
            'status' => $data['status'] ?? 'active',
        ]);

        return response()->json(['id' => $product->id], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['sometimes','required','string','max:255'],
            'price' => ['sometimes','required','numeric','min:0'],
            'status' => ['nullable', Rule::in(['active','inactive'])],
        ]);

        $product->fill([
            'name' => $data['name'] ?? $product->name,
            'price' => $data['price'] ?? $product->price,
            'description' => $request->input('description', $product->description),
            'status' => $data['status'] ?? $product->status,
        ])->save();

        return response()->json(['message' => 'updated']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
