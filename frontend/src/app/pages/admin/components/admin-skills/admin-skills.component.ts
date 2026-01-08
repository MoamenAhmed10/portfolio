import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillService, Skill } from '../../../../core/services/skill.service';

@Component({
  selector: 'app-admin-skills',
  standalone: false,
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css'],
})
export class AdminSkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillForm: FormGroup;
  isEditing = false;
  editingId: string | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;

  categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Other'];

  constructor(private fb: FormBuilder, private skillService: SkillService) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Frontend', Validators.required],
      level: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      icon: [''],
      order: [0],
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (data) => (this.skills = data),
      error: (err) => console.error('Error loading skills:', err),
    });
  }

  onSubmit(): void {
    if (this.skillForm.invalid) return;

    this.isLoading = true;
    const formValue = this.skillForm.value;

    if (this.isEditing && this.editingId) {
      this.skillService.updateSkill(this.editingId, formValue).subscribe({
        next: () => {
          this.showMessage('Skill updated successfully!', 'success');
          this.resetForm();
          this.loadSkills();
        },
        error: (err) => {
          this.showMessage('Error updating skill', 'error');
          console.error(err);
        },
      });
    } else {
      this.skillService.createSkill(formValue).subscribe({
        next: () => {
          this.showMessage('Skill added successfully!', 'success');
          this.resetForm();
          this.loadSkills();
        },
        error: (err) => {
          this.showMessage('Error adding skill', 'error');
          console.error(err);
        },
      });
    }
  }

  editSkill(skill: Skill): void {
    this.isEditing = true;
    this.editingId = skill._id || null;
    this.skillForm.patchValue({
      name: skill.name,
      category: skill.category,
      level: skill.level || 50,
      icon: skill.icon || '',
      order: skill.order || 0,
    });
  }

  deleteSkill(id: string | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this skill?')) return;

    this.skillService.deleteSkill(id).subscribe({
      next: () => {
        this.showMessage('Skill deleted successfully!', 'success');
        this.loadSkills();
      },
      error: (err) => {
        this.showMessage('Error deleting skill', 'error');
        console.error(err);
      },
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.skillForm.reset({ category: 'Frontend', level: 50, order: 0 });
    this.isLoading = false;
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter((s) => s.category === category);
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    this.isLoading = false;
    setTimeout(() => (this.message = ''), 3000);
  }
}
