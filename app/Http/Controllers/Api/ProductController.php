<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * [GET] /api/v1/products
     */
    public function index()
    {
        return response()->json(Product::with('category')->get(), 200); 
    }

    /**
     * [GET] /api/v1/products/{product}
     */
    public function show(Product $product)
    {
        return response()->json($product->load('category', 'variants'), 200);
    }

    /**
     * [POST] /api/v1/products - Tạo Sản phẩm và Biến thể
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'variants' => 'nullable|array', 
            'variants.*.color' => 'required_with:variants|string|max:50',
            'variants.*.size' => 'required_with:variants|string|max:50',
            'variants.*.stock' => 'required_with:variants|integer|min:0',
            'variants.*.price' => 'required_with:variants|numeric|min:0',
        ]);

        $product = DB::transaction(function () use ($validated, $request) {
            
            $product = Product::create($validated);
            
            if ($request->has('variants') && !empty($request->variants)) {
                $variantsToSave = [];
                foreach ($request->variants as $variantData) {
                    $variantsToSave[] = new ProductVariant($variantData);
                }
                $product->variants()->saveMany($variantsToSave);
            }

            return $product->load('category', 'variants'); 
        });

        return response()->json($product, 201);
    }

    /**
     * [PUT/PATCH] /api/v1/products/{product} - Cập nhật Sản phẩm và Biến thể
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'variants' => 'nullable|array', 
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.color' => 'required_with:variants|string|max:50',
            'variants.*.size' => 'required_with:variants|string|max:50',
            'variants.*.stock' => 'required_with:variants|integer|min:0',
            'variants.*.price' => 'required_with:variants|numeric|min:0',
        ]);

        DB::transaction(function () use ($product, $validated, $request) {
            
            // 1. Cập nhật Sản phẩm chính
            $product->update($validated);

            $inputVariants = $request->input('variants', []);
            $submittedVariantIds = []; 
            $variantsToCreate = []; 

            foreach ($inputVariants as $variantData) {
                // Biến thể đã có ID (cần cập nhật)
                if (isset($variantData['id']) && $variantData['id']) {
                    
                    // LỌC AN TOÀN HƠN: Đảm bảo biến thể thuộc về sản phẩm này
                    $variant = $product->variants()->find($variantData['id']);
                    
                    if ($variant) {
                        $variant->update($variantData);
                        $submittedVariantIds[] = $variantData['id'];
                    } else {
                        // Bỏ qua nếu ID biến thể không hợp lệ hoặc không thuộc về sản phẩm này
                    }

                } else {
                    // Biến thể mới (chưa có ID)
                    $variantsToCreate[] = new ProductVariant($variantData);
                }
            }

            // 2. Tạo biến thể mới 
            if (!empty($variantsToCreate)) {
                $product->variants()->saveMany($variantsToCreate);
            }
            
            // 3. Xóa các biến thể cũ không còn được gửi lên
            $product->variants()->whereNotIn('id', $submittedVariantIds)->delete();
        });

        // 1. Load lại quan hệ sau khi Transaction thành công
        $product->load('category', 'variants'); 
        
        // 2. TRẢ VỀ JSON
        return response()->json($product, 200);
    }

    /**
     * [DELETE] /api/v1/products/{product}
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
